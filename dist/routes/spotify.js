"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const spotify_1 = require("../controllers/spotify");
const router = (0, express_1.Router)();
router.get('/albums', spotify_1.getAlbums);
exports.default = router;
//# sourceMappingURL=spotify.js.map