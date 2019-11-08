<template>
	<div :data-active="active"
		@dragenter.prevent="highlight"
		@dragover.prevent="highlight"
		@dragleave.prevent="unhighlight"
		@drop.prevent="drop"
	>
		<slot v-bind="{ files, onInputChange, active }" name="input">
			<input type="file" @change="onInputChange">
		</slot>
	</div>
</template>

<script>
export default {
	name: 'DDFileInput',
	data () {
		return {
			files: [],
			active: false,
			inActiveTimeout: null
		}
	},
	methods: {
		onInputChange (e) {
			this.files.push(...e.target.files)
			e.target.value = null // reset so that selecting the same file again will still cause it to fire this change
		},
		highlight () {
			this.active = true
			clearTimeout(this.inActiveTimeout)
		},
		unhighlight () {
			this.inActiveTimeout = setTimeout(() => { this.active = false }, 10)
		},
		drop (e) {
			this.unhighlight()
			this.files.push(...e.dataTransfer.files)
		}
	},
	created () {
		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
			document.body.addEventListener(eventName, this.preventDefaults)
		})
	},
	destroyed () {
		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
			document.body.removeEventListener(eventName, this.preventDefaults)
		})
	}
}
</script>
