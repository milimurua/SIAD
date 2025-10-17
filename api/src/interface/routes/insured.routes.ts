import { Router } from "express";
import { GetSinistersByInsuredDni } from "../../application/reports/InsuredService";

const router = Router();

router.get("/insured/:dni", async (req, res) => {
  const { dni } = req.params;
  const usecase = new GetSinistersByInsuredDni();

  try {
    const result = await usecase.execute(dni);

    if (result.total === 0) {
      return res.status(404).json({
        message: `No person was found with ${dni}`,
      });
    }

    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
});

export default router;
