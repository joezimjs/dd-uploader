<template>
	<div id="app">
		<DDFileInput class="drop-area" v-model="appFiles">
			<template v-slot:input="{ onInputChange, active, removeFile }">
				<label for="file-input">
					<span v-if="!active">Drag Your Files Here</span>
					<span v-else>Drop Them</span>
					<input type="file" id="file-input" @change="onInputChange" />
				</label>
				<ul class="image-list" v-show="appFiles.length">
					<li v-for="(file, i) of appFiles" :key="file.id">
						<button @click="removeFile(i)" class="close-icon">&times;</button>
						<img :src="file.url" alt="" width=500>

						<!-- {{ file.file.name }} ({{i}}) {{ statusOf(file) }} -->

						<span class="status-indicator loading-indicator" v-show="statusOf(file) == 'loading'">Loading</span>
						<span class="status-indicator success-indicator" v-show="statusOf(file) == true">Uploaded</span>
						<span class="status-indicator failure-indicator" v-show="statusOf(file) == false">Error</span>
					</li>
				</ul>
			</template>
		</DDFileInput>
		<button @click.prevent="uploadFiles" class="upload-button">Upload</button>
	</div>
</template>

<script>
import DDFileInput from './components/DDFileInput.vue'
import Vue from 'vue'

export default {
	name: 'app',
	components: { DDFileInput },
	data: () => ({
		appFiles: [],
		uploads: [],
		status
	}),
	methods: {
		async uploadFiles () {
			this.status = 'in progress'
			try {
				await Promise.all(this.appFiles.map((file, i) => this.uploadFile(file)))
				this.status = 'success'
			} catch (e) {
				this.status = 'fail'
			}
		},
		async uploadFile (file) {
			// set up the request data
			let url = 'YOUR URL HERE'
			let formData = new FormData()
			formData.append('file', file)

			// set status to the promise to indicate it's in progress
			Vue.set(file, 'status', fetch(url, {
				method: 'POST',
				body: formData
			}))

			// get the response for the request when it finishes
			let response = await file.status

			// change status to indicate the success of the upload request
			Vue.set(file, 'status', response.ok)

			return response
		},
		statusOf (file) {
			let status = file.status

			if (status instanceof Promise) {
				return 'loading'
			}

			if (typeof status === 'boolean') {
				return status
			}

			return undefined
		}
	}
}
</script>

<style scoped lang="stylus">
#app
	font-family: Helvetica, Arial, sans-serif
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
	text-align: center
	color: #2c3e50
	margin: 60px auto 0
	max-width: 800px

button
	cursor: pointer

.drop-area
	padding: 50px
	background: #c5def3
	box-shadow: 0 0 10px rgba(0,0,0,.3)

	&[data-active]
		box-shadow: 0 0 10px rgba(0,0,0,.5)
		// background: #96b8d3
		// color: white

label
	font-size: 36px;

	input[type=file]
		position: absolute
		visibility: hidden
		pointer-events: none

.image-list
	display: flex
	list-style: none
	flex-wrap: wrap
	padding: 0

	li
		display: flex-item
		width: 20%
		margin: 1rem 2.5%
		position: relative

	img
		max-width: 100%
		display: block

	.close-icon, .status-indicator
		--size: 20px
		position: absolute
		line-height: var(--size)
		height: var(--size)
		border-radius: var(--size)
		box-shadow: 0 0 5px currentColor
		right: .25rem
		appearance: none
		border: 0
		padding: 0

	.close-icon
		width: var(--size)
		font-size: var(--size)
		background: #933
		color: #fff
		top: .25rem

	.status-indicator
		font-size: calc(.75 * var(--size))
		bottom: .25rem
		padding: 0 10px

	.loading-indicator
		animation: pulse 1.5s linear 0s infinite
		color: #000

	.success-indicator
		background: #6c6
		color: #040

	.failure-indicator
		background: #933
		color: #fff

.upload-button
	display: block
	appearance: none
	border: 0
	border-radius: 50px
	padding: .75rem 3rem
	margin: 1rem auto
	font-size: 1.25rem
	font-weight: bold
	background: #369
	color: #fff
	text-transform: uppercase

@keyframes pulse
	0%
		background: #fff
	50%
		background: #ddd
	100%
		background: #fff

</style>
