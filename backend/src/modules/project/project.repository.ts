import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './project.schema';
import { Model } from 'mongoose';
import {
  IProject,
  IProjectFindParam,
  IProjectLabel,
} from './project.interface';
import { ProjectTransformer } from './project.transformer';

@Injectable()
export class ProjectRepository {
  constructor(@InjectModel(Project.name) private db: Model<Project>) {}

  async find(params: IProjectFindParam): Promise<IProject[]> {
    const projects = await this.db.find(params);
    return (
      projects &&
      projects.map((project) =>
        ProjectTransformer.toResponse(project.toObject()),
      )
    );
  }

  async findOne(id: string): Promise<IProject> {
    // TODO: const project = await this.db.findById(id).lean().populate('owner');
    const project = await this.db.findById(id);
    return project && ProjectTransformer.toResponse(project.toObject());
  }

  async create(project: IProject): Promise<IProject> {
    const newProject = (await this.db.create(project)).toObject();
    return ProjectTransformer.toResponse(newProject);
  }

  async update(id: string, project: any): Promise<IProject> {
    return this.db.updateOne({ _id: id }, project).lean();
  }

  async addNewLabel(id: string, label: IProjectLabel): Promise<IProject> {
    await this.update(id, {
      $push: {
        labels: label,
      },
    });
    return this.findOne(id);
  }
}
