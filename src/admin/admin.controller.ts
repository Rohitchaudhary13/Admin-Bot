// src/admin/admin.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin') // Apply the decorator to the class
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getAdminPanel() {
    // You can pass data to the view if needed
    return { pageTitle: 'Admin Panel' };
  }

  @Post('update-settings')
  updateSettings(@Body() settings: any) {
    // Call the AdminService method to update bot settings
    this.adminService.updateBotSettings(settings);
    // You can send a response or redirect as needed
    return { message: 'Bot settings updated successfully' };
  }
  // Add more routes and controller methods as needed
}
