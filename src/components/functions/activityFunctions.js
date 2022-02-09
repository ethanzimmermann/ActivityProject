import { computed, reactive, ref } from '@vue/composition-api';
import axios from 'axios';

export function activityMaintenance() {
    //Determines if the filters modal is active
    const isFiltersModalActive = new ref(false);
    //Determines the index of the activity that is currently open
    const isOpen = new ref(0);

    //Stores the list of activities, as well as filter-related values
    const state = reactive({
        activities: [],
        filterProps: {
            useTypeFilter: false,
            useParticipantFilter: false,
            usePriceFilter: false,
            useAccessibilityFilter: false,
            typeFilter: "relaxation",
            participantFilter: 1,
            priceFilter: [0, 0.1],
            accessibilityFilter: [0, 0.1],
            showErrorText: false
        }
    })

    //Adds a random activity to the list
    function addActivity() {
        axios.get("http://www.boredapi.com/api/activity", {}
        ).then(response => {
            state.filterProps.showErrorText = false;
            state.activities.push(response.data)
            isOpen.value = state.activities.length - 1;
        })
    }

    //Adds a filtered activity to the list
    function addFilteredActivity(filters) {
        var query = "?";
        //Adds the type filter if selected
        if (filters.useTypeFilter) {
            query += "type=" + filters.typeFilter;
        }
        //Adds the participant filter if selected
        if (filters.useParticipantFilter) {
            //Add appropriate logic to query when necessary
            if (query != "?") {
                query += "&"
            }
            query += "participants=" + filters.participantFilter;
        }
        //Adds the price range filter when selected
        if (filters.usePriceFilter) {
            //Add appropriate logic to query when necessary
            if (query != "?") {
                query += "&"
            }
            var minPrice = 0;
            var maxPrice = 0;
            if (filters.priceFilter[0] > filters.priceFilter[1]) {
                minPrice = filters.priceFilter[1];
                maxPrice = filters.priceFilter[0];
            }
            else {
                minPrice = filters.priceFilter[0];
                maxPrice = filters.priceFilter[1];
            }
            query += "minprice=" + minPrice + "&maxprice=" + maxPrice;
        }
        //Adds accessiblity range filter when selected
        if (filters.useAccessibilityFilter) {
            //Add appropriate logic to query when necessary
            if (query != "?") {
                query += "&"
            }
            var minAccessibility = 0;
            var maxAccessibility = 0;
            if (filters.accessibilityFilter[0] > filters.accessibilityFilter[1]) {
                minAccessibility = filters.accessibilityFilter[1];
                maxAccessibility = filters.accessibilityFilter[0];
            }
            else {
                minAccessibility = filters.accessibilityFilter[0];
                maxAccessibility = filters.accessibilityFilter[1];
            }
            query += "minaccessibility=" + minAccessibility + "&maxaccessibility=" + maxAccessibility;
        }
        //Only run the query if it has been populated
        if (query != "?") {
            axios.get("http://www.boredapi.com/api/activity" + query, {}
            ).then(response => {
                //Display error text when no matches are returned
                if (response.data.error) {
                    state.filterProps.showErrorText = true;
                }
                else {
                    state.filterProps.showErrorText = false;
                    state.activities.push(response.data)
                    isOpen.value = state.activities.length - 1;
                }
                isFiltersModalActive.value = false;
            })
        }
    }

    //Toggles the filters modal
    function toggleFilters() {
        isFiltersModalActive.value = !isFiltersModalActive.value;
    }

    return {
        isOpen,
        isFiltersModalActive,
        activities: computed(() => state.activities),
        filterProps: state.filterProps,
        addFilteredActivity,
        addActivity,
        toggleFilters
    }
}