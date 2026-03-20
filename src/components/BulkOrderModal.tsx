import React, { useState } from 'react';
import { X, Package, Users, Calculator, Phone, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface BulkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

const BulkOrderModal: React.FC<BulkOrderModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    organizationType: '',
    quantity: '',
    deliveryAddress: '',
    requirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const organizationTypes = [
    { value: 'ngo', label: 'NGO/Non-Profit', discount: 40 },
    { value: 'school', label: 'School/Educational Institution', discount: 35 },
    { value: 'hospital', label: 'Hospital/Healthcare', discount: 30 },
    { value: 'corporate', label: 'Corporate/Company', discount: 25 },
    { value: 'government', label: 'Government Organization', discount: 30 },
    { value: 'distributor', label: 'Retail Distributor', discount: 20 },
  ];

  const getSelectedOrgType = () => {
    return organizationTypes.find(type => type.value === formData.organizationType);
  };

  const calculateBulkPrice = () => {
    const quantity = parseInt(formData.quantity) || 0;
    const orgType = getSelectedOrgType();
    const discount = orgType?.discount || 0;
    
    if (quantity < 50) return { total: 0, discount: 0, finalPrice: 0 };
    
    const baseTotal = quantity * product.price;
    const discountAmount = (baseTotal * discount) / 100;
    const finalPrice = baseTotal - discountAmount;
    
    return { total: baseTotal, discount: discountAmount, finalPrice };
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Bulk Order Request Submitted!",
        description: "Our team will contact you within 24 hours with a detailed quote.",
      });
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({
          organizationName: '',
          contactPerson: '',
          email: '',
          phone: '',
          organizationType: '',
          quantity: '',
          deliveryAddress: '',
          requirements: '',
        });
      }, 3000);
    }, 2000);
  };

  const pricing = calculateBulkPrice();
  const minQuantity = 50;
  const currentQuantity = parseInt(formData.quantity) || 0;

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h3 className="font-nunito font-bold text-xl text-foreground mb-2">
              Bulk Order Request Submitted!
            </h3>
            <p className="text-muted-foreground mb-4">
              Our team will contact you within 24 hours with a detailed quote and next steps.
            </p>
            <Badge variant="secondary" className="bg-success text-success-foreground">
              Request ID: BO-{Date.now().toString().slice(-6)}
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-primary" />
                <span>Bulk Order Request</span>
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Minimum order quantity: {minQuantity} units
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <div className="grid lg:grid-cols-2 gap-6 p-6">
          {/* Product Info */}
          <div>
            <Card className="border-0 bg-secondary/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-nunito font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="font-nunito font-bold text-primary mt-1">
                      ₹{product.price} per unit
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Calculator */}
            {currentQuantity >= minQuantity && formData.organizationType && (
              <Card className="border-0 bg-primary/5 mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Calculator className="w-4 h-4" />
                    <span>Bulk Pricing</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Base Price ({currentQuantity} units):</span>
                      <span>₹{pricing.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-success">
                      <span>{getSelectedOrgType()?.label} Discount ({getSelectedOrgType()?.discount}%):</span>
                      <span>-₹{pricing.discount.toLocaleString()}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Final Price:</span>
                      <span className="text-primary">₹{pricing.finalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      *Final pricing may vary based on delivery location and additional requirements
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="organizationType">Organization Type *</Label>
                <Select value={formData.organizationType} onValueChange={(value) => handleInputChange('organizationType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label} ({type.discount}% discount)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity">Quantity (Min: {minQuantity}) *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={minQuantity}
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  required
                />
                {currentQuantity > 0 && currentQuantity < minQuantity && (
                  <p className="text-sm text-destructive mt-1">
                    Minimum quantity is {minQuantity} units
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="deliveryAddress">Delivery Address *</Label>
              <Textarea
                id="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="requirements">Special Requirements</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                placeholder="Any special packaging, delivery timeline, or other requirements..."
                rows={3}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || currentQuantity < minQuantity}
                className="flex-1"
                size="lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Submit Bulk Order Request'
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} size="lg">
                Cancel
              </Button>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Need immediate assistance?</p>
                  <p className="text-sm text-muted-foreground">
                    Call us at +91 98765 43210 or email varshinienterprises29@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default BulkOrderModal;
