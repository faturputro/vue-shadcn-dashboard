<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <div class="w-1/2 flex flex-col items-center">
      <h2 class="font-bold text-8xl text-center">404</h2>
      <h3 class="font-medium text-2xl text-center my-2">Not Found</h3>
      <p class="text-center text-foreground/30 text-sm">The page you're trying to access <br/> could not be found</p>
      <RouterLink to="/dashboard/home">
        <Button class="mt-4" variant="outline" prepend-icon="ArrowLeft">Back to Home</Button>
      </RouterLink>
    </div>
  </div>
</template>