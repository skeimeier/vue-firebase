<template>
  <v-container>
    <v-layout justify-center>
      <v-text-field type="file" ref="filedlg" v-model="files" label="Dateiauswahl" multiple></v-text-field>
    </v-layout>
    <DragAndDropZone></DragAndDropZone>
  </v-container>
</template>


<script>
import DragAndDropZone from "@/components/DragAndDropZone";

export default {
  name: "Filepicker",
  components: {
    DragAndDropZone
  },
  data() {
    return {
      files: null
    };
  },
  methods: {}
};
</script>


<style scoped>
</style>


