<template>
  <div
    class="d-flex  align-items-center justify-content-center text-center position-relative mt-4"
    id="app"
  >
    <div
      class="p-5 col-md-12 rounded"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
      id="uploadContainer"
    >
      <input
        type="file"
        multiple
        name="fields[assetsFieldHandle][]"
        id="assetsFieldHandle"
        class="w-25 h-25 overflow-hidden"
        @change="onFileSelected"
        ref="file"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <label for="assetsFieldHandle" class="block cursor-pointer">
          <span class="text-secondary ">Drag and Drop files here</span> <br><span class="text-secondary">or</span><br>
        <div id="uploadText" class="mt-2 btn btn-sm btn-primary">Select files</div>
      </label>
      <aside class="d-flex align-items-center justify-content-center">
      
      
      <ul class="mt-4  text-decoration-none ulUpload"  v-if="this.selectedFile.length" v-cloak>
        <li class="text-sm mt-2" v-for="file in selectedFile" :key="file.name">
          <aside class="d-flex justify-content-between">
          <span>{{file.name}}</span> 
           <button class="btn btn-danger btn-sm ml-2" type="button"
            @click="remove(selectedFile.indexOf(file))"
            title="Remove file"
          >
            Remove
          </button>
          </aside>
  
  
        </li>
      </ul>


      <ul class="mt-4  text-decoration-none ulUpload"  v-if="this.filespreview.length" v-cloak>
        <li class="text-sm mt-2" v-for="file in filespreview" :key="file.name">

          <a :href='file.link' target='_blank' class='btn btn-secondary btn-sm ml-2'>Preview</a>
        </li>
      </ul>
      </aside>


    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: [],
      filespreview: [],
    };
  },
 
  methods: {
    onFileSelected(event) {
      let selectedFiles = event.target.files
      for(let i = 0; i < selectedFiles.length; i++){
        this.selectedFile.push(selectedFiles[i])
      }
      this.filePreview();
  
    },
    remove(i) {
      this.selectedFile.splice(i, 1);
      this.filePreview();
    },

    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains("bg-green-300")) {
        event.currentTarget.classList.remove("bg-gray-100");
        event.currentTarget.classList.add("bg-green-300");
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
    drop(event) {
      event.preventDefault();
      this.onFileSelected(); // Trigger the onChange event manually
      
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },


    filePreview(){
      let files = this.selectedFile;
      const fileContainer = [];
      for(let i = 0; i<files.length; i++){
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link : tmppath
          }
          fileContainer.push(thisFiles)
      }
      this.filespreview = fileContainer;
    }
  },

    watch:{
    filelist(newValue){
      this.$store.dispatch("createRfp/updateFileList", newValue);
    },
    filespreview(newValue){
      this.$store.dispatch("createRfp/updateFilePreview", newValue);
      // alert(newValue)
      console.log(newValue)
    },
  },



};
</script>
<style scoped>
#assetsFieldHandle{
  opacity: 0;
  position: absolute;
  overflow: hidden;
}

#uploadText{
  cursor: pointer;
}

#uploadContainer{
  background-color: #f8f9f9;
  border-width:5px;  
  border-style:dashed;
  border-color: #99BADD;

  /* opacity: 1; */
}

/* #uploadContainer::before{
  background-color: #f8f9f9;
  border-width:5px;  
  border-style:dashed;
  border-color: #99BADD;
  background-image: url("https://www.pngall.com/wp-content/uploads/2/Upload-PNG-Image-File.png");
  background-repeat:no-repeat;
  background-position:center center;
  background-size:contain;

} */

[v-cloak] {
  display: none;
}

.ulUpload{
    list-style:none;
    padding:0;
    margin:0;
    text-decoration: none;
}


</style>
