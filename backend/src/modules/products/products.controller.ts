import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/guards/jwt-guard'
import { UpdateUserDto, UserFromRequestDto } from '../users/dto'
import { CreateProductDto, UpdateProductDto } from './dto'
import { ProductsService } from './products.service'
import { ProductResponse } from './responses'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productService: ProductsService) {}

	@ApiOperation({ summary: 'Add product' })
	@ApiResponse({ status: 200, type: ProductResponse })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Post('create')
	@HttpCode(201)
	async create(
		@Body() dto: CreateProductDto,
		@Req() request: Request,
	): Promise<ProductResponse> {
		const user = request.user as UserFromRequestDto
		return this.productService.create(user.email, dto)
	}

	@ApiOperation({ summary: 'Get all products' })
	@ApiResponse({ status: 200, type: [ProductResponse] })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('get-all')
	@HttpCode(200)
	async getAll(@Req() request: Request): Promise<ProductResponse[]> {
		const user = request.user as UserFromRequestDto
		
		return this.productService.getAll(user.email)
	}

	@ApiOperation({ summary: 'Get products by category' })
	@ApiResponse({ status: 200, type: [ProductResponse] })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('get-all-by-category')
	@HttpCode(200)
	async getAllByCategory(@Query('cat_id') category_id: number | "null", @Req() request: Request): Promise<ProductResponse[]> {
		const user = request.user as UserFromRequestDto

		return this.productService.getAllByCategory(user.email, category_id)
	}
	
	@ApiOperation({ summary: 'Delete product' })
	@ApiResponse({ status: 200, type: Boolean })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id') id: number, @Req() request: Request): Promise<boolean> {
		const user = request.user as UserFromRequestDto
		return this.productService.delete(id, user.email)
	}

	@ApiOperation({ summary: 'Update product' })
	@ApiResponse({ status: 200, type: ProductResponse })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Put(':id')
	@HttpCode(200)
	async update(
		@Param('id') id: number,
		@Body() dto: UpdateProductDto,
		@Req() request: Request,
	): Promise<ProductResponse> {
		const user = request.user as UserFromRequestDto
		return this.productService.update(id, dto, user.email)
	}
}
