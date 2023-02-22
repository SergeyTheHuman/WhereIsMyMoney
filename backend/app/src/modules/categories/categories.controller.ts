import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/guards/jwt-guard'
import { UserFromRequestDto } from '../users/dto'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto, UpdateCategoryDto } from './dto'
import { CategoryResponse } from './responses'

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@ApiOperation({ summary: 'Add category' })
	@ApiResponse({ status: 200, type: CreateCategoryDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Post('create')
	@HttpCode(201)
	async create(
		@Body() dto: CreateCategoryDto,
		@Req() request: Request,
	): Promise<CategoryResponse> {
		const user = request.user as UserFromRequestDto

		return this.categoriesService.create(user.email, dto)
	}

	@ApiOperation({ summary: 'Get all categories' })
	@ApiResponse({ status: 200, type: [CategoryResponse] })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('get-all')
	@HttpCode(200)
	async getAll(@Req() request: Request): Promise<CategoryResponse[]> {
		const user = request.user as UserFromRequestDto

		return this.categoriesService.getAll(user.email)
	}

	@ApiOperation({ summary: 'Delete category' })
	@ApiResponse({ status: 200, type: Boolean })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Delete(':id')
	@HttpCode(200)
	async delete(
		@Param('id') id: number,
		@Req() request: Request,
	): Promise<boolean> {
		const user = request.user as UserFromRequestDto
		return this.categoriesService.delete(id, user.email)
	}

	@ApiOperation({ summary: 'Update category' })
	@ApiResponse({ status: 200, type: CategoryResponse })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Put(':id')
	@HttpCode(200)
	async update(
		@Param('id') id: number,
		@Body() dto: UpdateCategoryDto,
		@Req() request: Request,
	): Promise<CategoryResponse> {
		const user = request.user as UserFromRequestDto
		return this.categoriesService.update(id, dto, user.email)
	}
}
