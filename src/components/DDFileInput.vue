<template>
	<div :data-active="active"
			@dragenter.prevent="setActive"
			@dragover.prevent="setActive"
			@dragleave.prevent="setInactive"
			@drop.prevent="onDrop"
		>
		<slot v-bind="{ files, active, onInputChange, setActive, setInactive, removeFile }" name="input">
			<input type="file" @change="onInputChange">
		</slot>
	</div>
</template>

<script>
export default {
	name: 'DDFileInput',
	props: {
		value: {
			type: Array,
			default: () => []
		}
	},
	data: () => ({
		files: [],
		active: false,
		inActiveTimeout: null
	}),
	watch: {
		value: {
			handler () {
				this.files = [...this.value]
			},
			immediate: true
		}
	},
	methods: {
		onInputChange (e) {
			this.addFiles(e.target.files)
			e.target.value = null // reset so that selecting the same file again will still cause it to fire this change
		},

		// setActive and setInactive use timeouts, so that when you drag an item over a child element,
		// the dragleave event that is fired won't cause a flicker. A few ms is generally plenty of
		// time to wait for the next dragenter event to clear the timeout and set it back to active.
		setActive () {
			this.active = true
			clearTimeout(this.inActiveTimeout)
		},
		setInactive () {
			this.inActiveTimeout = setTimeout(() => { this.active = false }, 15)
		},

		removeFile (i) {
			this.files.splice(i, 1)
			this.$emit('input', this.files)
		},

		onDrop (e) {
			this.setInactive()
			this.addFiles(e.dataTransfer.files)
			this.$emit('input', this.files)
		},

		addFiles (files) {
			let isChanged = false
			for (let newFile of files) {
				let id = this.createId(newFile)
				// Only add the file to the list of files if we don't already have it.
				if (!this.fileExists(id)) {
					this.files.push({ file: newFile, id, url: this.getUrl(newFile) })
					isChanged = true
				}
			}

			// Let outside components know we've updated
			if (isChanged) {
				this.$emit('input', this.files)
			}
		},
		createId (file) {
			return `${file.name}-${file.size}-${file.lastModified}-${file.type}`
		},
		fileExists (otherId) {
			return this.files.some(({ id }) => id === otherId)
		},
		getUrl (file) {
			return URL.createObjectURL(file)
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
