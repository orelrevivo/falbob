import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const agencyId = 'f314c853-187a-4664-b077-9136b2d5cd62'
  
  try {
    const updatedAgency = await prisma.agency.update({
      where: { id: agencyId },
      data: { customerId: '' },
    })
    console.log('✅ Successfully cleared the old Customer ID for Agency:', agencyId)
  } catch (error) {
    console.error('❌ Error updating agency:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
