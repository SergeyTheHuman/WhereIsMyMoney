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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/guards/jwt-guard'
import { UpdateUserDto } from '../users/dto'
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
	@Post('create')
	@HttpCode(201)
	async create(
		@Body() dto: CreateProductDto,
		@Req() request: Request,
	): Promise<ProductResponse> {
		const user = request.user as UpdateUserDto
		return this.productService.create(user.email, dto)
	}

	@ApiOperation({ summary: 'Get all products' })
	@ApiResponse({ status: 200, type: [ProductResponse] })
	@UseGuards(JwtAuthGuard)
	@Get('get-all')
	@HttpCode(200)
	async getAll(@Req() request: Request): Promise<ProductResponse[]> {
		const user = request.user as UpdateUserDto
		
		return this.productService.getAll(user.email)
	}
	
	@ApiOperation({ summary: 'Delete product' })
	@ApiResponse({ status: 200, type: Boolean })
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id') id: number, @Req() request: Request): Promise<boolean> {
		const user = request.user as UpdateUserDto
		return this.productService.delete(id, user.email)
	}

	@ApiOperation({ summary: 'Delete product' })
	@ApiResponse({ status: 200, type: ProductResponse })
	@UseGuards(JwtAuthGuard)
	@Put(':id')
	@HttpCode(200)
	async update(
		@Param('id') id: number,
		@Body() dto: UpdateProductDto,
		@Req() request: Request,
	): Promise<ProductResponse> {
		const user = request.user as UpdateUserDto
		return this.productService.update(id, dto, user.email)
	}
}
