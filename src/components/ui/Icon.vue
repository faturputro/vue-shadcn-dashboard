<script setup lang="ts">
import { computed } from 'vue';
import * as icons from 'lucide-vue-next';

type IconsType = Record<string, any>;

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: Number,
  color: String,
  strokeWidth: {
    type: Number,
    default: 1.5,
  },
  defaultClass: String
});

const icon = computed(() => (icons as IconsType)[props.name]);
</script>

<template>
  <component
    :is="icon"
    :size="props.size"
    :color="props.color"
    :stroke-width="props.strokeWidth"
    :class="props.defaultClass"
  ></component>
</template>
