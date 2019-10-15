<template>
  <div v-if="!files.length">
    <form ref="fileform">
      <v-container>
        <div class="drop-files">
          <v-icon large>save_alt</v-icon>drop the files here!
        </div>
      </v-container>
    </form>
  </div>
  <div v-else>
    Gedroppte Dateien:
    <li>
      <div
        class="columns is-centered"
        style="important padding-buttom:0px"
        v-for="(file, id) in files"
        :key="id"
      >
        <div class="column is-one-quarter"></div>
        <div class="column is-one-quarter has-text-right">{{id+1}}</div>
        <div class="column has-text-left">{{file.name}}</div>
        <div class="column is-one-quarter"></div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "DragAndDropZone",
  data() {
    return {
      ok: "ok",
      dragAndDropCapable: false,
      files: []
    };
  },
  methods: {
    determineDragAndDropCapable() {
      var div = document.createElement("div");

      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    }
    // createHiddenFileImput(){
    //     let setupHiddenFileInput = () => {
    //         if (this.hiddenFileInput) {
    //             this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
    //         }
    //         this.hiddenFileInput = document.createElement("input");
    //         this.hiddenFileInput.setAttribute("type", "file");
    //         if ((this.options.maxFiles === null) || (this.options.maxFiles > 1)) {
    //             this.hiddenFileInput.setAttribute("multiple", "multiple");
    //         }
    //         this.hiddenFileInput.className = "dz-hidden-input";

    //         if (this.options.acceptedFiles !== null) {
    //             this.hiddenFileInput.setAttribute("accept", this.options.acceptedFiles);
    //         }
    //         if (this.options.capture !== null) {
    //             this.hiddenFileInput.setAttribute("capture", this.options.capture);
    //         }

    //         // Not setting `display="none"` because some browsers don't accept clicks
    //         // on elements that aren't displayed.
    //         this.hiddenFileInput.style.visibility = "hidden";
    //         this.hiddenFileInput.style.position = "absolute";
    //         this.hiddenFileInput.style.top = "0";
    //         this.hiddenFileInput.style.left = "0";
    //         this.hiddenFileInput.style.height = "0";
    //         this.hiddenFileInput.style.width = "0";
    //         Dropzone.getElement(this.options.hiddenInputContainer, 'hiddenInputContainer').appendChild(this.hiddenFileInput);
    //         return this.hiddenFileInput.addEventListener("change", () => {
    //             let {files} = this.hiddenFileInput;
    //             if (files.length) {
    //                  for (let file of files) {
    //                     this.addFile(file);
    //                 }
    //             }
    //             this.emit("addedfiles", files);
    //             return setupHiddenFileInput();
    //         });
    //     };
    //     setupHiddenFileInput();

    // }
  },
  mounted() {
    console.log("Mounted");
    if ((this.dragAndDropCapable = this.determineDragAndDropCapable())) {
      console.log("Drag And Drop Capable");
      this.ok = "OK";
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop",
        "click"
      ].forEach(
        function(evt) {
          this.$refs.fileform.addEventListener(
            evt,
            function(e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
        }.bind(this)
      );

      this.$refs.fileform.addEventListener(
        "drop",
        function(e) {
          console.log("Something Droped here!");
          console.log(e);
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            this.files.push(e.dataTransfer.files[i]);
          }
        }.bind(this)
      );
      this.$refs.fileform.addEventListener(
        "click",
        function(e) {
          console.log("Someone clicked here!");
          console.log(e);
          this.$refs.filedlg.click(e);
          //alert("du hast geklickt")

          // for( let i = 0; i < e.dataTransfer.files.length; i++ ){
          //     this.files.push( e.dataTransfer.files[i] );
          // }
        }.bind(this)
      );
    }
  }
};
</script>

<style scoped>
form {
  display: block;
  height: 400px;
  width: 400px;
  background: #ccc;

  margin: auto;
  margin-top: 40px;
  text-align: center;
  line-height: 400px;
}
li {
  line-height: 18px;
  color: rgb(107, 118, 211);
  margin-top: 5px;
  padding: 2px;
}
</style>
