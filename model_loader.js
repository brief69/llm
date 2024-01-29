const tf = require('tensorflow');

class ModelLoader {
  constructor(modelPath) {
    this.modelPath = modelPath;
    this.model = null;
  }

  async loadModel() {
    try {
      // Load the model from the provided path
      this.model = await tf.loadLayersModel(this.modelPath);
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading the model:', error);
      throw error;
    }
  }

  getModel() {
    if (!this.model) {
      throw new Error('Model not loaded. Call `loadModel` first.');
    }
    return this.model;
  }
}

module.exports = ModelLoader;
