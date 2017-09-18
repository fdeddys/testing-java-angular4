@echo off
set src=E:\apps\templates\atiila-core
set tgt=.
set entity=%1
set srcpathcode=%src%\src\main\java\id\atiila
set tgtpathcode=%tgt%\src\main\java\id\atiila

robocopy E:\apps\scm\repo\jhipster\generator-jhipster\generators .\node_modules\generator-jhipster\generators /MIR

rem master
call sync-entity-w RoleType role-type
call sync-entity-w StatusType status-type 
call sync-entity-nc PurposeType purpose-type 
call sync-entity-nc RelationType 
call sync-entity-w PeriodType period-type
call sync-entity-w ReligionType religion-type
call sync-entity-w WorkType work-type
call sync-entity-w OrderType order-type
call sync-entity-w ShipmentType shipment-type
call sync-entity-w BillingType billing-type
call sync-entity-nc PaymentType payment-type
call sync-entity-nc WorkEffortType work-effort-type
call sync-entity-nc RequirementType requirement-type
call sync-entity-w CategoryType category-type
call sync-entity-w Category category
call sync-entity-w PartyCategory party-category
call sync-entity-w ProductCategory product-category
call sync-entity-w UomType uom-type
call sync-entity-w Uom uom
call sync-entity-nc MasterNumbering master-numbering
call sync-entity-w FeatureType feature-type
call sync-entity-w Feature feature 
call sync-entity-w ProductType product-type
call sync-entity-w FacilityType facility-type
call sync-entity-w ContainerType container-type

echo "Set Group Menubar"
pause

rem Parties
call sync-entity-w Party party
call sync-entity-w Person person
call sync-entity-w Organization organization
echo "Set Group Menubar"
pause

rem Product
call sync-entity-w Product product
call sync-entity-w Good good
call sync-entity-w Service service
rem call sync-entity-w FinancialProduct financial-product
call sync-entity-w Motor motor
echo "Set Group Menubar"
pause

rem ContactMechanism
call sync-entity-w ContactMechanism contact-mechanism
call sync-entity-w PostalAddress postal-address
call sync-entity-nc TelecomunicationNumber telecomunication-number
call sync-entity-nc ElectronicAddress electronic-address 
rem call sync-entity ContactMechanismPurpose contact-mechanism-purpose 
echo "Set Group Menubar"
pause

rem Facility
call sync-entity-w Facility facility
call sync-entity-w Container container
echo "Set Group Menubar"
pause

rem PartyRole
call sync-entity-nc PartyRole 
call sync-entity-w Internal internal
call sync-entity-w Vendor vendor
call sync-entity-w Customer customer
call sync-entity-nc PartyRelationship party-relationship 
call sync-entity-w PersonalCustomer personal-customer
call sync-entity-w OrganizationCustomer organization-customer
call sync-entity-w ParentOrganization parent-organization
call sync-entity-w Branch branch
echo "Set Group Menubar"
pause

rem Requirement
call sync-entity-w Requirement requirement
call sync-entity-w UnitReqInternal unit-req-internal
echo "Set Group Menubar"
pause

rem Orders
call sync-entity-w Orders orders
call sync-entity-w OrderItem order-item
call sync-entity-nc VendorOrder vendor-order
call sync-entity-nc CustomerOrder customer-order
call sync-entity-w PurchaseOrder purchase-order
call sync-entity-nc PurchaseOrderItem purchase-order-item
call sync-entity-nc SalesOrderItem sales-order-item
echo "Set Group Menubar"
pause

rem Shipment
call sync-entity-w Shipment shipment
call sync-entity-w ShipmentItem shipment-item
echo "Set Group Menubar"
pause

rem Inventory
call sync-entity-w ShipmentPackage shipment-package
call sync-entity-w ShipmentReceipt shipment-receipt
call sync-entity-w InventoryItem inventory-item
echo "Set Group Menubar"
pause

rem Billing
call sync-entity-w Billing billing
call sync-entity-w BillingItem billing-item
echo "Set Group Menubar"
pause

rem Payment
call sync-entity-w Payment payment
call sync-entity-w PaymentApplication payment-application
echo "Set Group Menubar"
pause

rem WorkEffort
call sync-entity-w WorkEffort work-effort
