import React from "react";
import ReactDOM from "react-dom";
import Scene from "./Scene";

class Model extends React.Component {
  setup = (e) => {
    const { canvas, scene } = e;

    var camera = new BABYLON.UniversalCamera(
      "UniversalCamera",
      new BABYLON.Vector3(0, 0, -10),
      scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
  };

  run = (e) => {
    const { scene, engine } = e;
    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };

  onSceneMount = (e) => {
    const { scene } = e;

    this.setup(e);
    //console.log(Sword);

    // let rootFolder = Sword.substring(0, Sword.lastIndexOf("/") + 1);
    // let objName = Sword.substring(Sword.lastIndexOf("/")+1);
    // console.log(rootFolder, objName);
    BABYLON.SceneLoader.Append("sword/", "scene.gltf", scene, function (
      meshes
    ) {
      let model = scene.getMeshByName("__root__");

      model.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.WORLD);
      scene.createDefaultEnvironment({
        createSkybox: false,
        createGround: false
      });
      scene.createDefaultCameraOrLight(true, true, true);
    });

    this.run(e);
  };

  render() {
    return (
      <div>
        <Scene onSceneMount={this.onSceneMount} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Model />, rootElement);
