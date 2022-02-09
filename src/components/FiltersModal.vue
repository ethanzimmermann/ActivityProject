<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Activity Filter</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field>
            <b-checkbox v-model="filterProps.useTypeFilter"
              >Filter on Type</b-checkbox
            >
          </b-field>
          <b-field v-if="filterProps.useTypeFilter" label="Type">
            <b-select
              v-model="filterProps.typeFilter"
              placeholder="Select a type"
            >
              <option value="education">Education</option>
              <option value="recreational">Recreational</option>
              <option value="social">Social</option>
              <option value="diy">DIY</option>
              <option value="charity">Charity</option>
              <option value="cooking">Cooking</option>
              <option value="relaxation">Relaxation</option>
              <option value="music">Music</option>
              <option value="busywork">Busy Work</option>
            </b-select>
          </b-field>

          <b-field>
            <b-checkbox v-model="filterProps.useParticipantFilter"
              >Filter on Participant Count</b-checkbox
            >
          </b-field>
          <b-field
            v-if="filterProps.useParticipantFilter"
            label="Number of Participants"
          >
            <b-numberinput
              v-model="filterProps.participantFilter"
              placeholder="1"
              :min="1"
            ></b-numberinput>
          </b-field>

          <b-field>
            <b-checkbox v-model="filterProps.usePriceFilter"
              >Filter on Price Range</b-checkbox
            >
          </b-field>
          <b-field v-if="filterProps.usePriceFilter" label="Relative Price">
            <b-slider
              v-model="filterProps.priceFilter"
              :min="0"
              :max="1"
              :step="0.1"
              ticks
            >
            </b-slider>
          </b-field>

          <b-field>
            <b-checkbox v-model="filterProps.useAccessibilityFilter"
              >Filter on Accessibility Range</b-checkbox
            >
          </b-field>
          <b-field
            v-if="filterProps.useAccessibilityFilter"
            label="Accessibility Rating"
          >
            <b-slider
              v-model="filterProps.accessibilityFilter"
              :min="0"
              :max="1"
              :step="0.1"
              ticks
            >
            </b-slider>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button label="Close" @click="$emit('close')" />
          <b-button
            label="Get Activity"
            type="is-success"
            :disabled="
              !(
                filterProps.useTypeFilter ||
                filterProps.useParticipantFilter ||
                filterProps.usePriceFilter ||
                filterProps.useAccessibilityFilter
              )
            "
            @click="addFilteredActivity"
          />
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import { activityMaintenance } from "./functions/activityFunctions.js";

export default {
  name: "FiltersModal",
  setup() {
    const { filterProps } = activityMaintenance();

    function addFilteredActivity() {
      this.$emit("addFilteredActivity", filterProps);
    }

    return {
      addFilteredActivity,
      filterProps,
    };
  },
};
</script>