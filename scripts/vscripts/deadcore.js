import { Instance, Entities } from "cs_script/point_script";

// ============================================================
// Stage System
// ============================================================

let skipA = false;
let skipB = false;
let skipC = false;
let skipD = false;

function RandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function TriggerStage(stage) {
    const targets = {
        A: "stage_a",
        B: "stage_b",
        C: "stage_c",
        D: "stage_d_relay",
        RED_D: "stage_d_red_relay"
    };

    const target = targets[stage];
    if (!target) return;

    Entities.FireInput({
        name: target,
        input: "Trigger",
        delay: 0.0
    });
}

function SelectStage()
{
    if (skipA && skipB && skipC && skipD)
    {
        TriggerStage("RED_D");
        return;
    }

    if (skipA && skipB && skipC)
    {
        TriggerStage("D");
        return;
    }

    if (skipA && skipB)
    {
        TriggerStage("C");
        return;
    }

    if (skipA && skipC)
    {
        TriggerStage("B");
        return;
    }

    if (skipB && skipC)
    {
        TriggerStage("A");
        return;
    }

    if (skipA)
    {
        if (RandomInt(0, 1) == 0)
            TriggerStage("B");
        else
            TriggerStage("C");

        return;
    }

    if (skipB)
    {
        if (RandomInt(0, 1) == 0)
            TriggerStage("A");
        else
            TriggerStage("C");

        return;
    }

    if (skipC)
    {
        if (RandomInt(0, 1) == 0)
            TriggerStage("A");
        else
            TriggerStage("B");

        return;
    }

    let random = RandomInt(0, 2);

    if (random == 0)
    {
        TriggerStage("A");
    }
    else if (random == 1)
    {
        TriggerStage("B");
    }
    else
    {
        TriggerStage("C");
    }
}

Instance.OnScriptInput("MapStart", () => {
    SelectStage();
});

Instance.OnScriptInput("Skip_A", () => skipA = true);
Instance.OnScriptInput("Skip_B", () => skipB = true);
Instance.OnScriptInput("Skip_C", () => skipC = true);
Instance.OnScriptInput("Skip_D", () => skipD = true);

Instance.OnScriptInput("Reset", () => {
    skipA = false;
    skipB = false;
    skipC = false;
    skipD = false;
});

// ============================================================
// Replace Input "KeyValue"
// ============================================================

const a_cube = [
    "a_boss_b1",
    "a_boss_b2",
    "a_boss_b3",
    "a_boss_b4",
    "a_boss_b5",
    "a_boss_b6"
];

const cubeEntities = {};

for (const name of a_cube) {
    const boss = Entities.FindByName(name)[0];

    if (boss && boss.IsValid()) {
        cubeEntities[name] = boss;
    }
}

for (const name of a_cube) {
    Instance.OnScriptInput(`boss_closed_${name}`, () => {
        const boss = cubeEntities[name];

        if (boss && boss.IsValid()) {
            boss.SetEntityName(name);
        }
    });

    Instance.OnScriptInput(`boss_open_${name}`, () => {
        const boss = cubeEntities[name];

        if (boss && boss.IsValid()) {
            boss.SetEntityName(`${name}o`);
        }
    });
}

Instance.OnRoundStart(() => {
    for (const name of a_cube) {
        const boss = cubeEntities[name];

        if (boss && boss.IsValid()) {
            boss.SetEntityName(name);
        }
    }
});

/* OutPut
a_boss_b1
@OnFullyOpen map_brush RunScriptInput boss_open_a_boss_b1
@OnFullyClosed map_brush RunScriptInput boss_closed_a_boss_b1

a_boss_b2
@OnFullyOpen map_brush RunScriptInput boss_open_a_boss_b2
@OnFullyClosed map_brush RunScriptInput boss_closed_a_boss_b2

a_boss_b3
@OnFullyOpen map_brush RunScriptInput boss_open_a_boss_b3
@OnFullyClosed map_brush RunScriptInput boss_closed_a_boss_b3

a_boss_b4
@OnFullyOpen map_brush RunScriptInput boss_open_a_boss_b4
@OnFullyClosed map_brush RunScriptInput boss_closed_a_boss_b4

a_boss_b5
@OnFullyOpen map_brush RunScriptInput boss_open_a_boss_b5
@OnFullyClosed map_brush RunScriptInput boss_closed_a_boss_b5

a_boss_b6
@OnFullyOpen map_brush RunScriptInput boss_open_a_boss_b6
@OnFullyClosed map_brush RunScriptInput boss_closed_a_boss_b6
*/

// ============================================================
// Fix Bug
// ============================================================

Instance.OnRoundStart(() => {
    Entities.FireInput({
        name: "radiation_beam_timer*",
        input: "AddOutput",
        value: "OnTimer>radiation_beam_rotate_case>PickRandom>>0.0>-1",
        delay: 4.0
    });

    Entities.FireInput({
        name: "radiation_beam_maker1",
        input: "AddOutput",
        value: "OnEntitySpawned>radiation_beam1*>Start>>0.0>-1",
        delay: 4.0
    });
})