import { computed, reactive, ref } from '@vue/composition-api';
import axios from 'axios';

export function activityMaintenance() {
    const isComponentModalActive = new ref(false);
    const isOpen = new ref(0);

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

    function addActivity() {
        axios.get("http://www.boredapi.com/api/activity", {}
        ).then(response => {
            state.filterProps.showErrorText = false;
            state.activities.push(response.data)
            isOpen.value = state.activities.length - 1;
        })
    }

    function addFilteredActivity(filters) {
        var query = "?";
        if (filters.useTypeFilter) {
            query += "type=" + filters.typeFilter;
        }
        if (filters.useParticipantFilter) {
            if (query != "?") {
                query += "&"
            }
            query += "participants=" + filters.participantFilter;
        }
        if (filters.usePriceFilter) {
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
        if (filters.useAccessibilityFilter) {
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
        if (query != "?") {
            axios.get("http://www.boredapi.com/api/activity" + query, {}
            ).then(response => {
                if (response.data.error) {
                    state.filterProps.showErrorText = true;
                }
                else {
                    state.filterProps.showErrorText = false;
                    state.activities.push(response.data)
                    isOpen.value = state.activities.length - 1;
                }
                isComponentModalActive.value = false;
            })
        }
    }

    function toggleFilters() {
        isComponentModalActive.value = !isComponentModalActive.value;
    }

    return {
        isOpen,
        isComponentModalActive,
        activities: computed(() => state.activities),
        filterProps: state.filterProps,
        addFilteredActivity,
        addActivity,
        toggleFilters
    }
}