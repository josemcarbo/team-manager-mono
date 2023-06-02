import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import {
  ProjectCreateRequestDto,
  ProjectFindOneRequestDto,
  ProjectFindOneResponseDto,
} from './project.dto';
import { ProjectService } from './project.service';
import { IProject } from './project.interface';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [ProjectFindOneResponseDto] })
  @ApiOperation({ description: 'Find all projects by user' })
  @Get()
  find(@Req() request: any): Promise<IProject[]> {
    const owner = request.user.id;
    return this.projectService.find({ owner });
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProjectFindOneResponseDto })
  @ApiOperation({ description: 'Get one project' })
  @Get('/:id')
  findOne(@Param() { id }: ProjectFindOneRequestDto): Promise<IProject> {
    return this.projectService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProjectFindOneResponseDto })
  @ApiOperation({ description: 'Create a project' })
  @Post()
  create(
    @Body() project: ProjectCreateRequestDto,
    @Req() request: any,
  ): Promise<IProject> {
    const owner = request.user.id;
    return this.projectService.create({ ...project, owner });
  }
}
