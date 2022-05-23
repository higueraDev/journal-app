<template>
  <div class="entry-title d-flex justify-content-between p-2">
      <div>
          <span class="text-success fs-3 fw-bold">23</span>
          <span class="mx-1 fs-3">Mayo</span>
          <span class="mx-2 fs-4 fw-light">2022, Lunes</span>
      </div>
      <div>
          <button  class="btn btn-danger mx-2">
              Borrar
              <i class="fa fa-trash-alt"></i>
          </button>
          <button  class="btn btn-primary">
              Subir foto
              <i class="fa fa-upload"></i>
          </button>
      </div>
  </div>
  <div>
      <hr>
      <div class="d-flex flex-column px-3 h-75">
          <textarea placeholder="¿Que sucedió hoy?"></textarea>
      </div>
      <fab-component icon="fa-save"></fab-component>
      <img class="img-thumbnail" src="https://picsum.photos/400/400?random=1" alt="entry-picture">
  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
export default {
    components:{
        FabComponent:defineAsyncComponent(()=>import('../components/FabComponent.vue'))
    }
}
</script>

<style lang="scss" scoped>
textarea{ 
    font-size: 20px;
    border:none;
    height: 100%;
    &:focus{
        outline: none;
    }
}

img{
    width: 200px;
    position: fixed;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>