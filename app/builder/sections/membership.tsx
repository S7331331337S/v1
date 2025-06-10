'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Crown, Users, DollarSign, Calendar, Lock, Star } from 'lucide-react'

interface MembershipProps {
  onSave: (data: any) => void
  initialData?: any
}

export default function MembershipSection({ onSave, initialData }: MembershipProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || 'Premium Membership',
    description: initialData?.description || 'Join our exclusive community and get access to premium content, resources, and networking opportunities.',
    price: initialData?.price || 29,
    currency: initialData?.currency || 'USD',
    billingCycle: initialData?.billingCycle || 'monthly',
    maxMembers: initialData?.maxMembers || 500,
    features: initialData?.features || [
      'Exclusive content access',
      'Monthly live Q&A sessions',
      'Private community forum',
      'Resource library',
      'Networking events'
    ],
    isPrivate: initialData?.isPrivate || false,
    requiresApproval: initialData?.requiresApproval || false,
    ...initialData
  })

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    handleChange('features', newFeatures)
  }

  const addFeature = () => {
    handleChange('features', [...formData.features, ''])
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    handleChange('features', newFeatures)
  }

  const handleSave = () => {
    onSave(formData)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Crown className="h-5 w-5 text-yellow-600" />
        <h3 className="text-lg font-semibold">Membership</h3>
        <Badge variant="secondary">Digital Product</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Membership Details
            </CardTitle>
            <CardDescription>Configure your membership program</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="membership-title">Membership Title</Label>
              <Input
                id="membership-title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Premium Membership"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="membership-description">Description</Label>
              <Textarea
                id="membership-description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe what members get access to..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="membership-max-members">Max Members</Label>
              <Input
                id="membership-max-members"
                type="number"
                value={formData.maxMembers}
                onChange={(e) => handleChange('maxMembers', parseInt(e.target.value))}
                min={10}
                max={10000}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pricing
            </CardTitle>
            <CardDescription>Set membership pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="membership-price">Price</Label>
                <Input
                  id="membership-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                  min={0}
                  step={0.01}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="membership-currency">Currency</Label>
                <select
                  id="membership-currency"
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
              <Label htmlFor="membership-billing">Billing Cycle</Label>
              <select
                id="membership-billing"
                value={formData.billingCycle}
                onChange={(e) => handleChange('billingCycle', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Select billing cycle"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="lifetime">Lifetime</option>
              </select>
            </div>

            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Demo Features:</strong> Recurring billing, payment processing, 
                and member management will be available in the full version.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Membership Features
            </CardTitle>
            <CardDescription>List what members get access to</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {formData.features.map((feature: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Enter feature..."
                    aria-label={`Feature ${index + 1}`}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    aria-label="Remove feature"
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addFeature}
                className="w-full"
                size="sm"
              >
                + Add Feature
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Access Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Access Control
            </CardTitle>
            <CardDescription>Manage membership access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="membership-private"
                checked={formData.isPrivate}
                onChange={(e) => handleChange('isPrivate', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
                aria-label="Make membership private"
              />
              <Label htmlFor="membership-private">Private Membership</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="membership-approval"
                checked={formData.requiresApproval}
                onChange={(e) => handleChange('requiresApproval', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
                aria-label="Require approval for membership"
              />
              <Label htmlFor="membership-approval">Require Approval</Label>
            </div>

            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Demo Features:</strong> Member approval workflows, 
                access control, and community management will be available in the full version.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Preview
            </CardTitle>
            <CardDescription>How your membership will appear</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-600" />
                <h4 className="font-semibold">{formData.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{formData.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {formData.price} {formData.currency}/{formData.billingCycle}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {formData.maxMembers} max
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium">Features:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {formData.features.slice(0, 3).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-1">
                      <Star className="h-2 w-2" />
                      {feature}
                    </li>
                  ))}
                  {formData.features.length > 3 && (
                    <li className="text-xs text-muted-foreground">
                      +{formData.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>
              <Button className="w-full" size="sm">
                Join Membership
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-yellow-600 hover:bg-yellow-700">
          Save Membership
        </Button>
      </div>
    </div>
  )
} 