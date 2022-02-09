<template>
  <b-navbar centered="true" type="is-info">
    <template slot="start">
      <b-navbar-item tag="h2">
        <h2 style="font-weight: bold">Welcome to the activity finder</h2>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-success is-light" @click="$emit('toggleFilters')">
            <strong>Filters</strong>
          </a>
          <a class="button is-success is-light" @click="$emit('addActivity')">
            <strong>New Activity</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  name: "Header",
  setup() {},
};
</script>