import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

import event from './schemaTypes/event'
import speaker from './schemaTypes/speaker'
import blog from './schemaTypes/blog'

export default defineConfig({
  name: 'default',
  title: 'PSF (Peculiar Sisters Web)',
  projectId: 'w78ct3un',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [event, speaker, blog, ...schemaTypes],
  },
})