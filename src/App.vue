<template>
	<div id="app">
		<DDFileInput class="drop-area" v-model="appFiles">
			<template v-slot:input="{ onInputChange, files, active, removeFile }">
				<label for="">
					<span v-if="!active">Drag Your Files Here</span>
					<span v-else>Drop Them</span>
					<input type="file" @change="onInputChange" />
				</label>
				<ul v-for="(file, i) of appFiles" :key="file.name + file.size + file.lastModified + file.type">
					<img :src="getUrl(file)" alt="" width=500>
					<li @click="removeFile(i)">
						{{ file.name }} ({{i}})
					</li>
				</ul>
			</template>
		</DDFileInput>
		<button @click.prevent="uploadFiles">Upload</button>
	</div>
</template>

<script>
import DDFileInput from './components/DDFileInput.vue'

export default {
	name: 'app',
	components: { DDFileInput },
	data: () => ({
		appFiles: [],
		uploads: []
	}),
	methods: {
		getUrl (file) {
			return URL.createObjectURL(file)
		},
		uploadFiles() {
			this.uploads = appFiles.map(uploadFile)
		},
		async uploadFile(file) {
			let url = 'YOUR URL HERE'
			let formData = new FormData()

			formData.append('file', file)

			return await fetch(url, {
				method: 'POST',
				body: formData
			})
		}
	}
}
</script>

<style scoped lang="stylus">
#app
	font-family: "Avenir", Helvetica, Arial, sans-serif
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
	text-align: center
	color: #2c3e50
	margin: 60px auto 0
	max-width: 800px

.drop-area
	padding: 50px
	background: #c5def3

	&[data-active]
		box-shadow: 0 0 30px rgba(0,0,0,.3)
		background: #96b8d3
		color: white

label
	font-size: 36px;

	input[type=file]
		position: absolute
		visibility: hidden
		pointer-events: none
</style>
