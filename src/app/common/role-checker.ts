import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class RoleChecker {

    private pageRole: any;
    // {
    //     "updFlg": "TEakWBLbaGBK6svQPupZBg==",
    //     "delFlg": "/gXDdQxprXZcu9HgRIA+OA==",
    //     "infFlg": "c+ykL9OeM2NMlBaLwUGC+g=="
    //   },
    constructor() {
        this.pageRole = {
            "updFlg": "TEakWBLbaGBK6svQPupZBg==",
            "delFlg": "/gXDdQxprXZcu9HgRIA+OA==",
            "infFlg": "c+ykL9OeM2NMlBaLwUGC+g=="
        }
    }
    public isGranted(abilities: any[]) {
        if (this.pageRole) {
            return abilities.filter((v, i, a) => {
                return !!this.pageRole[v];
            }).length == abilities.length;
        }
        return false
    }
}

