import { Controller, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";


@UseGuards(JwtAuthGuard)
@Controller("ordem_de_transporte")
export class OrdemDeTransporteController {
    constructor(private readonly ordem_de_transporte_service){}

    

}