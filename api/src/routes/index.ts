import { Router } from "express";
import { branchesRouter } from "./branches.routes";
import { insuranceRouter } from "./insurance.routes";
import { insuredRouter } from "./insured.routes";
import { safeProducerRouter } from "./safe_producer.routes";
import { sinisterRouter } from "./sinister.routes";
import { usuariosRouter } from "./user.routes";

const router = Router();

router.use("/branches", branchesRouter);
router.use("/insurance", insuranceRouter);
router.use("/insured", insuredRouter);
router.use("/safe-producer", safeProducerRouter);
router.use("/sinister", sinisterRouter);
router.use("/users", usuariosRouter);

export default router;
