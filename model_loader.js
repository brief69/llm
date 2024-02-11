const tf = require('tensorflow'); // TensorFlowライブラリをインポートします。Import the TensorFlow library.

class ModelLoader {
  constructor(modelPath) {
    this.modelPath = modelPath; // モデルのパスを保存します。Save the path of the model.
    this.model = null; // モデルを初期化します。Initialize the model.
  }

  async loadModel() {
    try {
      // 提供されたパスからモデルをロードします。Load the model from the provided path.
      this.model = await tf.loadLayersModel(this.modelPath);
      console.log('Model loaded successfully'); // モデルが正常にロードされたことをログに記録します。Log that the model was loaded successfully.
    } catch (error) {
      console.error('Error loading the model:', error); // モデルのロード中にエラーが発生したことをログに記録します。Log an error if there was a problem loading the model.
      throw error; // エラーを投げます。Throw the error.
    }
  }

  getModel() {
    if (!this.model) {
      // モデルがロードされていない場合にエラーを投げます。Throw an error if the model is not loaded.
      throw new Error('Model not loaded. Call `loadModel` first.');
    }
    return this.model; // ロードされたモデルを返します。Return the loaded model.
  }
}

module.exports = ModelLoader; // ModelLoaderクラスをエクスポートします。Export the ModelLoader class.
