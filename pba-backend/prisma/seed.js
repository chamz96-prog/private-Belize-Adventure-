const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const tours = [
    {
      title: 'Altun Ha & Cave Tubing',
      slug: 'altun-ha-cave-tubing',
      shortDescription: 'Explore ancient ruins and float through caves.',
      description: 'Experience the best of Belize with a visit to the Altun Ha Mayan ruins followed by a refreshing cave tubing adventure.',
      basePriceAdult: 85.0,
      basePriceChild: 65.0,
    },
    {
      title: 'Xunantunich & Cave Tubing',
      slug: 'xunantunich-cave-tubing',
      shortDescription: 'Climb El Castillo and tube through crystal caves.',
      description: 'Visit the impressive Xunantunich Mayan site and enjoy a guided cave tubing tour.',
      basePriceAdult: 95.0,
      basePriceChild: 75.0,
    },
  ];

  for (const tour of tours) {
    await prisma.tour.upsert({
      where: { slug: tour.slug },
      update: {},
      create: tour,
    });
  }
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
