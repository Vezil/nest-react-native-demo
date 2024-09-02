import { Controller, Get, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getData() {
        return this.appService.getData();
    }

    @Post()
    create(@Body() { text }: { text: string }) {
        return this.appService.add(text);
    }

    @Post('setTodoStatus')
    setDone(@Body() { id, isDone }: { id: number; isDone: boolean }) {
        return this.appService.setTodoStatus(id, isDone);
    }
}
