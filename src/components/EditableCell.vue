
// i have used this for modelvalue and UpdateModelValue
<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  type: { type: String, default: 'text' }
})
const emit = defineEmits(['update:modelValue'])

const editing = ref(false)
const localValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  localValue.value = val
})

function save() {
  emit('update:modelValue', localValue.value)
  editing.value = false
}
</script>

<template>
  <span v-if="!editing" @click="editing = true" style="cursor:pointer;">
    {{ modelValue }}
  </span>
  <input
    v-else
    :type="type"
    v-model="localValue"
    @blur="save"
    @keyup.enter="save"
    @keyup.esc="editing = false"
    style="width: 100px;"
    autofocus
  />
</template>