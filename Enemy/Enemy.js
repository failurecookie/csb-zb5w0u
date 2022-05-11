/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Enemy extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("square", "./Enemy/costumes/square.svg", {
        x: 14.066797565807292,
        y: 14.327308826593963
      }),
      new Costume("triangle", "./Enemy/costumes/triangle.svg", {
        x: 25.816311661844253,
        y: 13.605893983944952
      }),
      new Costume("costume1", "./Enemy/costumes/costume1.svg", {
        x: 19.29140422189809,
        y: 11.670993807150268
      })
    ];

    this.sounds = [new Sound("pop", "./Enemy/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "500 points!" },
        this.whenIReceive500Points
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "500 points!" },
        this.whenIReceive500Points2
      ),
      new Trigger(Trigger.BROADCAST, { name: "start" }, this.whenIReceiveStart),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "start" },
        this.whenIReceiveStart2
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone2)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.complete = "False";
    this.stage.vars.score = 0;
    this.stage.vars.OfClones = 0;
    this.stage.vars.doneWithGame = "False";
    this.visible = false;
  }

  *whenIReceive500Points() {
    this.stage.vars.doneWithGame = "True";
    this.deleteThisClone();
  }

  *whenIReceive500Points2() {
    this.visible = false;
  }

  *whenIReceiveStart() {
    while (!(this.stage.vars.doneWithGame == "True")) {
      while (!(this.stage.vars.OfClones == 10000)) {
        this.stage.vars.OfClones += 1;
        this.createClone();
        yield* this.wait(this.random(0.4, 3));
        yield;
      }
      yield;
    }
  }

  *startAsClone() {
    this.goto(this.random(-250, 250), this.random(-400, 400));
    this.costume = this.random(1, 3);
    this.visible = true;
    while (true) {
      if (this.costumeNumber == 1) {
        this.costume = "triangle";
        while (true) {
          if (this.touching(this.sprites["Character"].andClones())) {
            this.stage.vars.score += 2;
            this.deleteThisClone();
          }
          yield;
        }
      }
      if (this.costumeNumber == 2) {
        this.costume = "square";
        while (true) {
          if (this.touching(this.sprites["Character"].andClones())) {
            this.stage.vars.score += 1;
            this.deleteThisClone();
          }
          yield;
        }
      }
      if (this.costumeNumber == 3) {
        this.costume = "costume1";
        while (true) {
          if (this.touching(this.sprites["Character"].andClones())) {
            this.stage.vars.score += 10;
            this.deleteThisClone();
          }
          yield;
        }
      }
      yield;
    }
  }

  *whenIReceiveStart2() {
    while (true) {
      if (this.stage.vars.score == 100 || this.stage.vars.score > 100) {
        this.broadcast("500 points!");
        this.stage.vars.complete = "True";
        /* TODO: Implement data_hidevariable */ null;
      }
      yield;
    }
  }

  *startAsClone2() {
    while (true) {
      if (this.stage.vars.complete == "True") {
        this.visible = false;
        /* TODO: Implement stop other scripts in sprite */ null;
        this.deleteThisClone();
      }
      yield;
    }
  }
}
