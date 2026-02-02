<script setup>
import { ref } from "vue";

const count = ref(0);
const step = ref(1);
const previous = ref(null);

function updateCount(newValue) {
  previous.value = count.value;
  count.value = newValue;
}

function increment() {
  let nextValue = count.value + step.value;
  if (nextValue >= 100) {
    nextValue = 100;
  }
  updateCount(nextValue)
}

function decreament() {
  let nextValue = count.value - step.value;
  if (nextValue <= 0) {
    newValue = 0;
  }
  updateCount(nextValue)
}

function reset() {
  updateCount(0)
}

function undo() {
  if (previous.value !== null) {
    count.value = previous.value;
    previous.value = null;
  }
}
</script>

<template>
  <div class="card">
    <h1>Counter App</h1>
    <p>Click buttons to change the number.</p>

    <div class="count">{{ count }}</div>

    <div class="row">
      <button class="btn inc" @click="increment">+ Increase</button>
      <button class="btn dec" @click="decreament">- Decrease</button>
    </div>

    <div class="row">
      <button class="btn reset" @click="reset">Reset</button>
      <button class="btn undo" @click="undo" :disabled="previous === null">Undo</button>
    </div>

    <div class="hint">
      Step: <input type="number" min="1" v-model.number="step" />
    </div>
  </div>
</template>

<style scoped>
.card {
    width: min(48opx, 92vw);
    background-color: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

h1{
    margin: 0 0 6px;
    text-align: center;
    font-size: 36px;

}
</style>
