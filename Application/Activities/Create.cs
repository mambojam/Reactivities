using Domain;
using MediatR;
using Persistence;
using SQLitePCL;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest // Not returning anything
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command> // Not returning anything 
        {

            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }            
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                
                await _context.SaveChangesAsync();
            }
        }


    }
}