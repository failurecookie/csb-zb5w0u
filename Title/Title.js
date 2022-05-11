/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Title extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("title", "./Title/costumes/title.svg", {
        x: 156.48978333333338,
        y: 76.26383833333334
      }),
      new Costume("start", "./Title/costumes/start.svg", {
        x: 66,
        y: 30.41292641048824
      })
    ];

    this.sounds = [
      new Sound(
        "Zeldas Lullaby (Remix)",
        "./Title/sounds/Zeldas Lullaby (Remix).mp3"
      ),
      new Sound(
        "Minecraft - Sweden (Remix)",
        "./Title/sounds/Minecraft - Sweden (Remix).mp3"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "start" }, this.whenIReceiveStart),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.cred = 0;
  }

  *whenGreenFlagClicked() {
    this.stage.costume = "backdrop1";
    this.effects.clear();
    this.goto(0, 0);
    this.visible = true;
    this.costume = "title";
    yield* this.glide(0.3, 0, 50);
    yield* this.glide(0.2, 0, 70);
    yield* this.glide(0.01, 0, 75);
    this.createClone();
    while (true) {
      for (let i = 0; i < 10; i++) {
        yield* this.startSound("Minecraft - Sweden (Remix)");
        yield* this.wait(163);
        yield;
      }
      yield;
    }
  }

  *whenIReceiveStart() {
    this.stage.costume = 2;
    this.visible = false;
  }

  *startAsClone() {
    this.effects.ghost = 100;
    this.goto(0, 0);
    this.costume = "start";
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += -10;
      yield;
    }
    while (true) {
      if (this.mouse.down && this.touching("mouse")) {
        this.broadcast("start");
        this.deleteThisClone();
      }
      yield;
    }
  }
}
