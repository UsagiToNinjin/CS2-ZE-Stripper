import { Instance, CSGearSlot } from "cs_script/point_script";

Instance.OnScriptInput("Strip", (inputData) => {
    const activator = inputData.activator;

    if (!activator || !activator.IsValid())
        return;

    const knife = activator.FindWeaponBySlot(CSGearSlot.KNIFE);

    if (knife && knife.IsValid()) {
        activator.DestroyWeapon(knife);
    }
});

/* Stripper
{
    "add":
    [
        {
			"targetname": "",
			"classname": "trigger_once",
			"origin": "0 0 0",
			"angles": "0 0 0",
            "scales": "1 1 1",
            "startdisabled": "0",
            "filtername": "",
            "spawnflags": "4097",
            "model": "maps/(map_name)/entities/(brush_name).vmdl",
            "io":
            [
                {
                    "outputname": "OnTrigger",
                    "targetname": "strip_knife",
                    "inputname": "RunScriptInput",
                    "overrideparam": "Strip",
                    "delay": 0.0,
                    "timestofire": 1
                }
            ]
        },

        {
			"targetname": "strip_knife",
			"classname": "point_script",
            "cs_script": "scripts/vscripts/strip_knife.vjs"
        }
    ]
}
*/