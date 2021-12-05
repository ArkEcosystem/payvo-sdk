// @ts-nocheck

/*!
 * custom.js - custom inspect symbol for bcrypto
 * Copyright (c) 2018-2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcrypto
 */

"use strict";

import { inspect } from "util";

exports.custom = inspect.custom || "inspect";
