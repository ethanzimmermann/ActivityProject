<template>
  <div id="app">
    <Header @addActivity="addActivity" @toggleFilters="toggleFilters" />
    <b-collapse
      class="card"
      animation="slide"
      v-for="(activity, index) of activities"
      :key="index"
      :open="isOpen == index"
      @open="isOpen = index"
    >
      <template #trigger="props">
        <div class="card-header" role="button">
          <p class="card-header-title">
            {{ activity.activity }}
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <div class="content">
          <div class="columns">
            <div class="column">
              <p>Accessibility Rating: {{ activity.accessibility }}</p>
            </div>
            <div class="column">
              <p>Acivity type: {{ activity.type }}</p>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <p>Number of Participants: {{ activity.participants }}</p>
            </div>
            <div class="column">
              <p>Price Range: {{ activity.price }}</p>
            </div>
          </div>
          <div v-if="activity.link" class="columns">
            <div class="column">
              <p>
                Link:
                <a :href="activity.link" target="_blank">{{ activity.link }}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
    <b-message
      title="No Matches"
      :active="filterProps.showErrorText"
      type="is-danger"
      aria-close-label="Close message"
      size="is-medium"
    >
      No activities match the selected filters
    </b-message>
    <b-modal
      :active="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template>
        <FiltersModal
          @close="toggleFilters"
          @addFilteredActivity="addFilteredActivity"
        ></FiltersModal>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import FiltersModal from "./components/FiltersModal.vue";
import { activityMaintenance } from "./components/functions/activityFunctions.js";

export default {
  name: "App",
  components: {
    Header,
    FiltersModal,
  },
  setup() {
    const {
      isOpen,
      activities,
      filterProps,
      isComponentModalActive,
      addActivity,
      addFilteredActivity,
      toggleFilters,
    } = activityMaintenance();

    return {
      isOpen,
      activities,
      filterProps,
      isComponentModalActive,
      addActivity,
      toggleFilters,
      addFilteredActivity,
    };
  },
};
</script>

