import { Instance } from "cs_script/point_script";

// ============================================================
// Skip State
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

    Instance.EntFireAtName({
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
// Potal Sound
// ============================================================

const BGM = "sounds/music/music_potal.vsnd_c";

Instance.OnScriptInput("PlayBGM", ({ activator }) => {
    if (!activator || !activator.IsValid())
        return;

    const player = activator.GetPlayerController();

    if (!player || !player.IsConnected())
        return;

    const slot = player.GetPlayerSlot();

    Instance.ClientCommand(slot, `play "${BGM}"`);
});

// ============================================================
// Set Health 100
// ============================================================

Instance.SetThink(() => {
    for (const player of Instance.GetAllPlayerControllers()) {
        if (!player.IsConnected())
            continue;

        const pawn = player.GetPlayerPawn();

        if (!pawn || !pawn.IsValid())
            continue;

        if (pawn.GetTeamNumber() !== 3 || !pawn.IsAlive())
            continue;

        if (pawn.GetMaxHealth() !== 100)
            pawn.SetMaxHealth(100);

        if (pawn.GetHealth() > 100)
            pawn.SetHealth(100);
    }

    Instance.SetNextThink(Instance.GetGameTime() + 1);
});

Instance.SetNextThink(Instance.GetGameTime() + 1);
