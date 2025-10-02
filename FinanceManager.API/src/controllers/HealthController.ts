import { Get, Route, Tags } from 'tsoa';
import { BaseController } from '@/controllers/BaseController';

@Route('health')
@Tags('Health')
export class HealthController extends BaseController {
  @Get('/')
  public async getHealth(): Promise<{ status: string; timestamp: string; uptime: number }> {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  }
}
