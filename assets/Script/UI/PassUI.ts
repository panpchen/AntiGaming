// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "../Game";
import PopBaseUI from "./PopBaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PassUI extends PopBaseUI {
  @property(cc.Node)
  icon: cc.Node = null;
  @property(cc.Label)
  timeLabel: cc.Label = null;

  onDisable() {
    this.timeLabel.node.scale = 0;
    this.icon.y = 343;
  }

  init(data) {
    this.timeLabel.string = `用时：${Game.instance.countDownFormat(data.gameTime)}`;
    cc.tween(this.icon)
      .to(0.7, { y: 209 }, { easing: "bounceOut" })
      .call(() => {
        cc.tween(this.timeLabel.node)
          .to(0.6, { scale: 1 }, { easing: "elasticOut" })
          .start();
      })
      .start();
  }

  clickNextLevel() {
    this.hide();
    cc.director.emit("gameNextLevel");
  }
}
