import { Instance } from "cs_script/point_script";

let skipA = false;
let skipB = false;
let skipC = false;

let currentStage = "";


// ============================================================
// Random
// ============================================================

function RandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ============================================================
// Stage Trigger
// ============================================================

function TriggerStage(stage)
{
    currentStage = stage;

    switch (stage)
    {
        case "A":
            Instance.EntFireAtName({
                name: "stage_a",
                input: "Trigger"
            });
            break;

        case "B":
            Instance.EntFireAtName({
                name: "stage_b",
                input: "Trigger"
            });
            break;

        case "C":
            Instance.EntFireAtName({
                name: "stage_c",
                input: "Trigger"
            });
            break;

        case "D":
            Instance.EntFireAtName({
                name: "stage_d_relay",
                input: "Trigger"
            });
            break;
    }
}


// ============================================================
// Stage Select
// ============================================================

function SelectStage()
{
    // A + B + C → D
    if (skipA && skipB && skipC)
    {
        TriggerStage("D");
        return;
    }

    // A + B → C
    if (skipA && skipB)
    {
        TriggerStage("C");
        return;
    }

    // A + C → B
    if (skipA && skipC)
    {
        TriggerStage("B");
        return;
    }

    // B + C → A
    if (skipB && skipC)
    {
        TriggerStage("A");
        return;
    }

    // Only A, Skip → B / C
    if (skipA)
    {
        if (RandomInt(0, 1) == 0)
            TriggerStage("B");
        else
            TriggerStage("C");

        return;
    }

    // Only B, Skip → A / C
    if (skipB)
    {
        if (RandomInt(0, 1) == 0)
            TriggerStage("A");
        else
            TriggerStage("C");

        return;
    }

    // Only C, Skip → A / B
    if (skipC)
    {
        if (RandomInt(0, 1) == 0)
            TriggerStage("A");
        else
            TriggerStage("B");

        return;
    }

    // Nothing, Non_Skip → A / B / C
    let random = RandomInt(0, 2);

    if (random == 0)
        TriggerStage("A");
    else if (random == 1)
        TriggerStage("B");
    else
        TriggerStage("C");
}


// ============================================================
// MapStart
// ============================================================

function MapStart()
{
    skipA = false;
    skipB = false;
    skipC = false;

    currentStage = "";

    SelectStage();
}


// ============================================================
// Skip A
// ============================================================

function SkipA()
{
    skipA = true;
    SelectStage();
}


// ============================================================
// Skip B
// ============================================================

function SkipB()
{
    skipB = true;
    SelectStage();
}


// ============================================================
// Skip C
// ============================================================

function SkipC()
{
    skipC = true;
    SelectStage();
}


// ============================================================
// Reset
// ============================================================

function Reset()
{
    skipA = false;
    skipB = false;
    skipC = false;

    currentStage = "";
}


// ============================================================
// Script Input
// ============================================================

Instance.OnScriptInput("MapStart", () =>
{
    MapStart();
});

Instance.OnScriptInput("Skip A", () =>
{
    SkipA();
});

Instance.OnScriptInput("Skip B", () =>
{
    SkipB();
});

Instance.OnScriptInput("Skip C", () =>
{
    SkipC();
});

Instance.OnScriptInput("Reset", () =>
{
    Reset();
});