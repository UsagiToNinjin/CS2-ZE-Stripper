// map ze_deadcore_r
// workshop id 3331345627
// -----------------------
// Do not use. Testing
// -----------------------
import { Instance } from "cs_script/point_script";

let text = "";
let running = false;

let textDelay = 1.0;       // Text deletion interval
let hudTimer = 0.0;        // ShowHudHint timer
let textTimer = 0.0;       // Text deletion timer

const thinkRate = 0.1;     // Think update interval

Instance.SetThink(() => {

    if (!running)
        return;

    // -----------------------
    // Execute ShowHudHint every 0.1 seconds
    // -----------------------
    Instance.EntFireAtTarget({
        target: "gametext_hud",
        input: "ShowHudHint",
        value: "",
        delay: 0.0
    });

    // -----------------------
    // Text deletion timer
    // -----------------------
    textTimer += thinkRate;

    if (textTimer >= textDelay) {

        textTimer = 0;

        Instance.EntFireAtTarget({
            target: "gametext_hud",
            input: "SetMessage",
            value: text,
            delay: 0.0
        });

        // Remove the last character
        text = text.slice(0, -1);

        if (text.length === 0) {

            Instance.EntFireAtTarget({
                target: "gametext_hud",
                input: "SetMessage",
                value: "",
                delay: 0.0
            });

            running = false;
            return;
        }
    }

    Instance.SetNextThink(thinkRate);
});


function StartText(seconds) {

    const index = ["0", "1"];
    const temp = [];

    for (let i = 0; i < 10; i++) {
        temp.push(index[Math.floor(Math.random() * index.length)]);
    }

    text = temp.join("...");

    // Calculate the deletion interval based on the total duration
    textDelay = seconds / text.length;

    textTimer = 0;
    running = true;

    Instance.SetNextThink(thinkRate);
}

// Receive RunScriptInput from point_script
Instance.OnScriptInput("StartText", (value) => {

    const seconds = Number(value);

    if (isNaN(seconds) || seconds <= 0)
        return;

    StartText(seconds);
});