'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingBag, DollarSign, Package, Image, Truck } from 'lucide-react'

interface MerchProps {
  onSave: (data: any) => void
  initialData?: any
}

export default function MerchSection({ onSave, initialData }: MerchProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || 'Branded Merchandise',
    description: initialData?.description || 'Show your support with our exclusive branded merchandise and accessories.',
    price: initialData?.price || 25,
    currency: initialData?.currency || 'USD',
    category: initialData?.category || 'clothing',
    sizes: initialData?.sizes || ['S', 'M', 'L', 'XL'],
    colors: initialData?.colors || ['Black', 'White'],
    inventory: initialData?.inventory || 100,
    shipping: initialData?.shipping || 5,
    imageUrl: initialData?.imageUrl || '',
    ...initialData
  })

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    onSave(formData)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold">Merchandise</h3>
        <Badge variant="secondary">Digital Product</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Product Details
            </CardTitle>
            <CardDescription>Configure your merchandise</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="merch-title">Product Title</Label>
              <Input
                id="merch-title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Branded T-Shirt"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="merch-description">Description</Label>
              <Textarea
                id="merch-description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe your merchandise..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="merch-category">Category</Label>
              <select
                id="merch-category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Select product category"
              >
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="home">Home & Office</option>
                <option value="digital">Digital Products</option>
                <option value="other">Other</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pricing & Inventory
            </CardTitle>
            <CardDescription>Set pricing and manage inventory</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="merch-price">Price</Label>
                <Input
                  id="merch-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                  min={0}
                  step={0.01}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="merch-currency">Currency</Label>
                <select
                  id="merch-currency"
                  value={formData.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Select currency"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="merch-inventory">Inventory Quantity</Label>
              <Input
                id="merch-inventory"
                type="number"
                value={formData.inventory}
                onChange={(e) => handleChange('inventory', parseInt(e.target.value))}
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="merch-shipping">Shipping Cost</Label>
              <Input
                id="merch-shipping"
                type="number"
                value={formData.shipping}
                onChange={(e) => handleChange('shipping', parseFloat(e.target.value))}
                min={0}
                step={0.01}
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Product Options
            </CardTitle>
            <CardDescription>Configure sizes, colors, and variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="merch-sizes">Available Sizes</Label>
              <Input
                id="merch-sizes"
                value={formData.sizes.join(', ')}
                onChange={(e) => handleChange('sizes', e.target.value.split(',').map(s => s.trim()))}
                placeholder="S, M, L, XL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="merch-colors">Available Colors</Label>
              <Input
                id="merch-colors"
                value={formData.colors.join(', ')}
                onChange={(e) => handleChange('colors', e.target.value.split(',').map(s => s.trim()))}
                placeholder="Black, White, Red"
              />
            </div>

            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Demo Features:</strong> Advanced variant management, 
                inventory tracking, and fulfillment integration will be available in the full version.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Media & Shipping */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Media & Shipping
            </CardTitle>
            <CardDescription>Add images and configure shipping</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="merch-image">Product Image URL</Label>
              <Input
                id="merch-image"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="merch-shipping-method">Shipping Method</Label>
              <select
                id="merch-shipping-method"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Select shipping method"
              >
                <option value="standard">Standard Shipping</option>
                <option value="express">Express Shipping</option>
                <option value="pickup">Local Pickup</option>
                <option value="digital">Digital Download</option>
              </select>
            </div>

            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Demo Features:</strong> Image upload, shipping calculator, 
                and fulfillment automation will be available in the full version.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Preview
            </CardTitle>
            <CardDescription>How your merchandise will appear</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-green-600" />
                <h4 className="font-semibold">{formData.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{formData.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {formData.price} {formData.currency}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  {formData.inventory} in stock
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  +{formData.shipping} shipping
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>Sizes: {formData.sizes.join(', ')}</p>
                <p>Colors: {formData.colors.join(', ')}</p>
              </div>
              <Button className="w-full" size="sm">
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          Save Merchandise
        </Button>
      </div>
    </div>
  )
} 