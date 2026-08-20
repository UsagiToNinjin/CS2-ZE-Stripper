# CS2 Zombie Escape Stripper

This Stripper configuration was created to improve gameplay convenience.
> [!NOTE]
> A dedicated plugin is required to use this feature.
https://github.com/Source2ZE/StripperCS2

## Translation

Maps that display in-game messages in languages other than English have been modified to support multiple languages(including English)

Supported entities:

* `point_servercommand (say)`
* `point_worldtext`
* `env_hudhint`

This feature is only available for Stripper configurations whose commit messages contain keywords such as `language`>`other languages/...`.

You can change the language by referring to the comments at the top of the `default_ents.jsonc` file.
Please enter the desired language serial number in the `overrideparam` value of `language_counter`.

```jsonc
{
    "outputname": "OnMapSpawn",
    "targetname": "language_counter",
    "inputname": "SetValue",
    "overrideparam": "1", // please enter the language serial number here
    "delay": 0.0,
    "timestofire": -1
}
```
**_NOTE:_** If this value is not changed, the default Japanese setting will be applied.
## Lyrics

For maps that contain music, the song title, artist, and lyrics have been added for display.

Both the original lyrics and their romanized version are displayed. This feature is implemented through the `env_hudhint` entity.

<img width="1280" height="424" alt="730_73" src="https://github.com/user-attachments/assets/81741f67-1b99-4094-b643-5932901f7058" />

This feature is only available for Stripper configurations whose commit messages contain keywords such as `Lyrics`.

It also includes a toggle (on/off) feature, allowing you to turn the lyrics on or off.
Modify the `overrideparam` value of `lyric_toggle` at the top of the `default_ents.jsonc` file.

```jsonc
{
    "outputname": "OnMapSpawn",
    "targetname": "language_counter",
    "inputname": "SetValueTest",
    "overrideparam": "1", // Enable:1, Disable:0
    "delay": 0.0,
    "timestofire": -1
}

**_NOTE:_** If this value is not changed, the default Enable setting will be applied.

## Lua Script

Lua script functionality has been implemented to work without requiring any Lua script execution plugins.

For cases where Lua scripts are used to apply effects to players, the `RunScriptCode` input has been replaced with `KeyValue` operations.

The `KeyValue` implementation is based on CS2Fixes.
https://github.com/Source2ZE/CS2Fixes/wiki/Custom-Mapping-Features

This feature is applied to all Stripper configurations whose commit messages contain `convert lua script`.

## Bug Fixes

Various bugs present in the map have been fixed.

This feature is applied to all Stripper configurations whose commit messages contain `fix bug`.

For detailed information, please refer to the `// + fix bug` comments at the top of the corresponding Stripper files.
