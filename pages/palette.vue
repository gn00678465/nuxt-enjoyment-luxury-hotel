<script setup lang="ts">
import IconAccountBox from '~icons/mdi/account-box';

const route = useRoute();
</script>

<template>
  <div class="p-10">
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <p class="text-primary">
      primary
    </p>
    <p class="text-info">
      info
    </p>
    <p class="text-success">
      success
    </p>
    <p class="text-warning">
      warning
    </p>
    <p class="text-error">
      error
    </p>
    <div class="text-white bg-primary">
      primary
    </div>
    <div class="text-white bg-info">
      info
    </div>
    <div class="text-white bg-success">
      success
    </div>
    <div class="text-white bg-warning">
      warning
    </div>
    <div class="text-white bg-error">
      error
    </div>
    <div class="bg-body text-white">
      background-body
    </div>
    <br>
    <p class="text-display">
      display
    </p>
    <h1 class="text-h1">
      heading-1
    </h1>
    <h2 class="text-h2">
      heading-2
    </h2>
    <h3 class="text-h3">
      heading-3
    </h3>
    <h4 class="text-h4">
      heading-4
    </h4>
    <h5 class="text-h5">
      heading-5
    </h5>
    <h6 class="text-h6">
      heading-6
    </h6>
    <p class="text-title">
      Title
    </p>
    <p class="text-subtitle">
      Subtitle
    </p>
    <p class="text-body">
      Body
    </p>
    <p class="text-body2">
      Body2
    </p>
    <p class="text-tiny">
      tiny
    </p>

    <a
      href="https://nuxt.com/docs/getting-started/routing"
      target="_blank"
    >Learn more about Nuxt Routing</a>

    <IconAccountBox />
  </div>
</template>
