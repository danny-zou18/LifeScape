import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from "firebase-admin";
import { db } from "../utils/db.server";

const router = express.Router();
const prisma = new PrismaClient();

/** @api {post} /items/create/:characterId Create Item
 *  @apiName CreateItem
 *  @apiGroup Item
 *
 * @apiDescription Create an item for a character
 *
 * @apiParam {String} characterId Character ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiBody {String} name Name of the item
 * @apiBody {String} description Description of the item
 * @apiBody {Number} cost Cost of the item
 * @apiBody {Number} rarity Rarity of the item
 * @apiBody {String} type Type of the item
 * @apiBody {String} URL URL of the item
 * @apiBody {Number} Quantity Quantity of the item
 *
 * @apiSuccess {Object} item Item object
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 OK
 *      {
 *        ITEM OBJECT
 *      }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError ItemCreationFailed Item creation failed
 * @apiErrorExample {json} ItemCreationFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Item Creation Failed"
 *      }
 */
router.post("/create/:characterId", async (req, res) => {
    const { characterId } = req.params;
    const { name, description, cost, rarity, type, URL, Quantity } = req.body;

    try {
        const item = await db.item.create({
            data: {
                name,
                description,
                cost,
                rarity,
                type,
                URL,
                Quantity,
                CharacterId: parseInt(characterId),
            },
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: "Item Creation Failed" });
    }
});

/** @api {get} /items/get/:characterId Get Items
 *  @apiName GetItems
 *  @apiGroup Item
 *
 * @apiDescription Get all items for a character
 *
 * @apiParam {String} characterId Character ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiSuccess {Object[]} items Array of item objects
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        ITEM OBJECT[]
 *      }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError GetItemsFailed Failed to get items
 * @apiErrorExample {json} GetItemsFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Failed to get items"
 *      }
 */
router.get("/get/:userId/:characterId", async (req, res) => {
    const { userId, characterId } = req.params;

    const authToken = req.headers.authorization;
    try {
        const authUser = await auth().verifyIdToken(authToken as string);
        if (authUser.uid !== userId) {
        res.status(403).json({ error: "Unauthorized" });
        }
    } catch (e) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const items = await prisma.item.findMany({
            where: {
                CharacterId: parseInt(characterId),
            },
        });
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: "Failed to get items" });
    }
});

/** @api {put} /items/update/:itemId Update Item
 *  @apiName UpdateItem
 *  @apiGroup Item
 *
 * @apiDescription Update an item
 *
 * @apiParam {String} itemId Item ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiBody {String} name Name of the item
 * @apiBody {String} description Description of the item
 * @apiBody {Number} cost Cost of the item
 * @apiBody {Number} rarity Rarity of the item
 * @apiBody {String} type Type of the item
 * @apiBody {String} URL URL of the item
 * @apiBody {Number} Quantity Quantity of the item
 *
 * @apiSuccess {Object} item Item object
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        ITEM OBJECT
 *      }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError ItemUpdateFailed Item update failed
 * @apiErrorExample {json} ItemUpdateFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Failed to update item"
 *      }
 */
router.put("/update/:itemId", async (req, res) => {
    const { itemId } = req.params;
    const { name, description, cost, rarity, type, URL, Quantity } = req.body;

    try {
        const item = await prisma.item.update({
            where: { id: parseInt(itemId) },
            data: {
                name,
                description,
                cost,
                rarity,
                type,
                URL,
                Quantity,
            },
        });
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: "Failed to update item" });
    }
});

/** @api {delete} /items/delete/:itemId Delete Item
 *  @apiName DeleteItem
 *  @apiGroup Item
 *
 * @apiDescription Delete an item
 *
 * @apiParam {String} itemId Item ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiSuccess {Object} message Success message
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "success": "Item deleted"
 *      }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError ItemDeletionFailed Item deletion failed
 * @apiErrorExample {json} ItemDeletionFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Failed to delete item"
 *      }
 */
router.delete("/delete/:itemId", async (req, res) => {
    const { itemId } = req.params;

    try {
        await prisma.item.delete({
            where: { id: parseInt(itemId) },
        });
        res.status(200).json({ success: "Item deleted" });
    } catch (error) {
        res.status(400).json({ error: "Failed to delete item" });
    }
});

export { router as itemsRouter };