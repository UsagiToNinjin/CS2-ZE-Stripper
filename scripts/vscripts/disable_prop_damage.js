import { Instance } from 'cs_script/point_script';

Instance.OnModifyPlayerDamage((stuff) => {
    let inflictor = stuff.inflictor;
    if (inflictor?.GetClassName() == "prop_physics" || inflictor?.GetClassName() == "prop_physics_override") {
        let damage = 0;
        return { damage };
    }
});

/* stripper
{
    "add": 
    [
        {
            "targetname": "disable_prop_damage",
            "classname": "point_script",
            "cs_script": "scripts/vscripts/disable_prop_damage.vjs"
        }
    ]
]
*/            