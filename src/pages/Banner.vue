<template>
  <div class="q-pa-md">
    <!-- Intento basico -->
    <div id="q-app">
      <q-input v-model="file" type="file"></q-input>
      <q-btn @click="upLoadFile()">Subir</q-btn>
    </div>
    <!--------------------->
    <q-form ref="form" class="q-gutter-md" @submit="onSubmit">
      <q-file
        v-model="form_file"
        filled
        label="Select poster image"
        name="poster_file"
      />

      <q-file
        v-model="files"
        filled
        label="Select cover images"
        multiple
        name="cover_files"
        use-chips
      />

      <div>
        <q-btn color="primary" label="Subir" type="submit"/>
      </div>
    </q-form>

    <q-card v-if="submitEmpty" bordered class="q-mt-md bg-grey-2" flat>
      <q-card-section>
        Submitted form contains empty formData.
      </q-card-section>
    </q-card>
    <q-card v-else-if="submitResult.length > 0" bordered class="q-mt-md bg-grey-2" flat>
      <q-card-section>Submitted form contains the following formData (key = value):</q-card-section>
      <q-separator/>
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >{{ item.name }} = {{ item.value }}
        </div>
      </q-card-section>
    </q-card>
  </div>

</template>

<script>
import * as axios from 'axios'

export default {
  name: 'Banner',
  data () {
    return {
      // intento basico
      file: null,
      // ---------------
      form_file: null,
      files: null,
      submitEmpty: false,
      submitResult: []
    }
  },

  methods: {
    upLoadFile () {
      const senData = new FormData()
      senData.append('archivo', this.file[0])
      axios.post('http://localhost:8000/upload',
        senData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
    },
    onSubmit (evt) {
      const formData = new FormData(evt.target)
      const submitResult = []
      // debugger
      for (const [name, value] of formData.entries()) {
        if (value.name.length > 0) {
          submitResult.push({
            name,
            value: value.name
          })
        }
      }

      this.submitResult = submitResult
      this.submitEmpty = submitResult.length === 0
      // guardo el file
      /*       const banner = formData.get('poster_file')
      axios.defaults.headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/upload', banner)
        .then(function (response) {
          alert('Archivo guardado.')
        })
        .catch(function (error) {
          console.log(error)
          alert('Archivo no cargado.')
        }) */
      const senData = new FormData()
      senData.append('banner', this.form_file)
      // formData.append('banner', this.form.file)
      /* const params = new URLSearchParams({
        banner: formData.get('poster_file')
      }).toString() */

      const url = 'http://localhost:8000/api/upload'

      axios
        .post(url, senData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
          }
        })
        .then(res => {
          // this.Info = JSON.parse(res.data)
          alert('Archivo guardado.')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

</script>
